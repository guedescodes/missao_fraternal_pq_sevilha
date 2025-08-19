"use client";

import { useState, useEffect } from "react";
import { Users, Download, RefreshCw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Cadastro {
  id: string;
  nomeCompleto: string;
  idade: number;
  celular: string;
  motorista: boolean;
  disponibilidade: "ambos" | "sabado" | "domingo";
  instrumento?: string;
  congregacao: string;
  dataCadastro: string;
}

export default function ListaCadastros() {
  const [cadastros, setCadastros] = useState<Cadastro[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("todos");

  useEffect(() => {
    carregarCadastros();
  }, []);

  const carregarCadastros = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/cadastro");
      const data = await response.json();

      if (response.ok) {
        setCadastros(data.cadastros || []);
      } else {
        setError("Erro ao carregar cadastros");
      }
    } catch {
      setError("Erro de conexão");
    } finally {
      setLoading(false);
    }
  };

  const exportarCSV = () => {
    const headers = [
      "Nome Completo",
      "Idade",
      "Celular",
      "Motorista",
      "Disponibilidade",
      "Instrumento",
      "Congregação",
      "Data do Cadastro",
    ];

    const csvContent = [
      headers.join(","),
      ...cadastros.map((cadastro) =>
        [
          `"${cadastro.nomeCompleto}"`,
          cadastro.idade,
          `"${cadastro.celular}"`,
          cadastro.motorista ? "Sim" : "Não",
          getDisponibilidadeText(cadastro.disponibilidade),
          cadastro.instrumento ? `"${cadastro.instrumento}"` : "",
          `"${cadastro.congregacao}"`,
          new Date(cadastro.dataCadastro).toLocaleDateString("pt-BR"),
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `cadastros-missao-fraternal-${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getDisponibilidadeText = (disponibilidade: string) => {
    switch (disponibilidade) {
      case "ambos":
        return "Ambos os dias";
      case "sabado":
        return "Sábado";
      case "domingo":
        return "Domingo";
      default:
        return disponibilidade;
    }
  };

  const getDisponibilidadeColor = (disponibilidade: string) => {
    switch (disponibilidade) {
      case "ambos":
        return "bg-green-100 text-green-800";
      case "sabado":
        return "bg-blue-100 text-blue-800";
      case "domingo":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const cadastrosFiltrados = cadastros.filter((cadastro) => {
    if (filter === "todos") return true;
    if (filter === "motoristas") return cadastro.motorista;
    if (filter === "ambos") return cadastro.disponibilidade === "ambos";
    if (filter === "sabado") return cadastro.disponibilidade === "sabado";
    if (filter === "domingo") return cadastro.disponibilidade === "domingo";
    return true;
  });

  const estatisticas = {
    total: cadastros.length,
    motoristas: cadastros.filter((c) => c.motorista).length,
    ambos: cadastros.filter((c) => c.disponibilidade === "ambos").length,
    sabado: cadastros.filter((c) => c.disponibilidade === "sabado").length,
    domingo: cadastros.filter((c) => c.disponibilidade === "domingo").length,
  };

  if (loading) {
    return (
      <div className="bg-gradient-mission min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando cadastros...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-mission min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="logo-container animate-logo-float">
              <Image
                src="/logo-ccb.png"
                alt="Logo Congregação Cristã no Brasil"
                width={80}
                height={80}
                className="w-20 h-20 object-contain"
                priority
              />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Lista de Cadastros
          </h1>
          <p className="text-gray-600 text-lg mb-4">
            Missão Fraternal - Setembro 2024
          </p>

          <div className="flex justify-center space-x-4 mb-6">
            <Link href="/" className="btn-primary">
              Novo Cadastro
            </Link>
            <button
              onClick={carregarCadastros}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Atualizar
            </button>
            <button
              onClick={exportarCSV}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar CSV
            </button>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow-md text-center">
            <div className="text-2xl font-bold text-blue-600">
              {estatisticas.total}
            </div>
            <div className="text-sm text-gray-600">Total</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md text-center">
            <div className="text-2xl font-bold text-green-600">
              {estatisticas.motoristas}
            </div>
            <div className="text-sm text-gray-600">Motoristas</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md text-center">
            <div className="text-2xl font-bold text-green-600">
              {estatisticas.ambos}
            </div>
            <div className="text-sm text-gray-600">Ambos os dias</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md text-center">
            <div className="text-2xl font-bold text-blue-600">
              {estatisticas.sabado}
            </div>
            <div className="text-sm text-gray-600">Sábado</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md text-center">
            <div className="text-2xl font-bold text-purple-600">
              {estatisticas.domingo}
            </div>
            <div className="text-sm text-gray-600">Domingo</div>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg p-4 shadow-md mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter("todos")}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === "todos"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Todos ({estatisticas.total})
            </button>
            <button
              onClick={() => setFilter("motoristas")}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === "motoristas"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Motoristas ({estatisticas.motoristas})
            </button>
            <button
              onClick={() => setFilter("ambos")}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === "ambos"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Ambos os dias ({estatisticas.ambos})
            </button>
            <button
              onClick={() => setFilter("sabado")}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === "sabado"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Sábado ({estatisticas.sabado})
            </button>
            <button
              onClick={() => setFilter("domingo")}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === "domingo"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Domingo ({estatisticas.domingo})
            </button>
          </div>
        </div>

        {/* Lista de Cadastros */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {error ? (
            <div className="p-8 text-center text-red-600">
              <p>{error}</p>
              <button
                onClick={carregarCadastros}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Tentar Novamente
              </button>
            </div>
          ) : cadastrosFiltrados.length === 0 ? (
            <div className="p-8 text-center text-gray-600">
              <Users className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-lg font-medium mb-2">
                {filter === "todos"
                  ? "Nenhum cadastro encontrado"
                  : "Nenhum cadastro com este filtro"}
              </p>
              <p className="text-sm">
                {filter === "todos"
                  ? "Ainda não há cadastros para a Missão Fraternal."
                  : "Não há cadastros que correspondam ao filtro selecionado."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nome
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Idade
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contato
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Motorista
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Disponibilidade
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Instrumento
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Congregação
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cadastrosFiltrados.map((cadastro) => (
                    <tr key={cadastro.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {cadastro.nomeCompleto}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {cadastro.idade} anos
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {cadastro.celular}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            cadastro.motorista
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {cadastro.motorista ? "Sim" : "Não"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDisponibilidadeColor(
                            cadastro.disponibilidade
                          )}`}
                        >
                          {getDisponibilidadeText(cadastro.disponibilidade)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {cadastro.instrumento || "-"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {cadastro.congregacao}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(cadastro.dataCadastro).toLocaleDateString(
                          "pt-BR"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>© 2024 Congregação Cristã no Brasil</p>
          <p className="mt-1">
            <a
              href="https://congregacaocristanobrasil.org.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline font-medium"
            >
              congregacaocristanobrasil.org.br
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
