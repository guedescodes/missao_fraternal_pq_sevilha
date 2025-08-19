"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  User,
  Phone,
  Car,
  Music,
  Calendar,
  Church,
  CheckCircle,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Schema de validação
const formSchema = z.object({
  nomeCompleto: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  idade: z.number().min(1, "Idade é obrigatória").max(120, "Idade inválida"),
  celular: z.string().min(10, "Celular deve ter pelo menos 10 dígitos"),
  motorista: z.string(),
  disponibilidade: z.enum(["ambos", "sabado", "domingo"]),
  instrumento: z.string().optional(),
  congregacao: z.string().min(1, "Congregação é obrigatória"),
});

type FormData = z.infer<typeof formSchema>;

export default function CadastroMissaoFraternal() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    // Transformar motorista de string para boolean
    const dadosParaEnviar = {
      ...data,
      motorista: data.motorista === "true",
    };
    
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosParaEnviar),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitSuccess(true);
        reset();
      } else {
        console.error("Erro ao enviar cadastro:", result);
        alert("Erro ao enviar cadastro. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro de rede:", error);
      alert("Erro de conexão. Verifique sua internet e tente novamente.");
    } finally {
      setIsSubmitting(false);
      // Resetar mensagem de sucesso após 5 segundos
      setTimeout(() => setSubmitSuccess(false), 5000);
    }
  };

  if (submitSuccess) {
    return (
      <div className="bg-gradient-mission flex items-center justify-center p-4">
        <div className="card max-w-md w-full text-center animate-fade-in">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Cadastro Realizado!
          </h2>
          <p className="text-gray-600 mb-6">
            Seu cadastro para a Missão Fraternal foi enviado com sucesso.
          </p>
          <button
            onClick={() => setSubmitSuccess(false)}
            className="btn-primary w-full"
          >
            Fazer Novo Cadastro
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-mission py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          {/* Logo da CCB */}
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
            Missão Fraternal
          </h1>
          <p className="text-gray-600 text-lg mb-2">
            Cadastro para Participação - Setembro 2024
          </p>
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full text-sm text-blue-700 font-medium">
            <Calendar className="w-4 h-4 mr-2" />
            20 e 21 de Setembro
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Congregação Cristã no Brasil
          </p>
          <div className="mt-4">
            <Link
              href="/lista"
              className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
            >
              <Users className="w-4 h-4 mr-2" />
              Ver Lista de Cadastros
            </Link>
          </div>
        </div>

        {/* Formulário */}
        <div className="card animate-slide-in">
          <form onSubmit={handleSubmit(onSubmit)} className="form-section">
            {/* Nome Completo */}
            <div className="form-field">
              <label className="form-label">
                <User className="w-4 h-4 mr-2" />
                Nome Completo *
              </label>
              <input
                type="text"
                {...register("nomeCompleto")}
                className={`form-input ${errors.nomeCompleto ? "error" : ""}`}
                placeholder="Digite seu nome completo"
              />
              {errors.nomeCompleto && (
                <p className="error-message">{errors.nomeCompleto.message}</p>
              )}
            </div>

            {/* Idade */}
            <div className="form-field">
              <label className="form-label">
                <User className="w-4 h-4 mr-2" />
                Idade *
              </label>
              <input
                type="number"
                {...register("idade", { valueAsNumber: true })}
                className={`form-input ${errors.idade ? "error" : ""}`}
                placeholder="Digite sua idade"
                min="1"
                max="120"
              />
              {errors.idade && (
                <p className="error-message">{errors.idade.message}</p>
              )}
            </div>

            {/* Celular/WhatsApp */}
            <div className="form-field">
              <label className="form-label">
                <Phone className="w-4 h-4 mr-2" />
                Celular/WhatsApp *
              </label>
              <input
                type="tel"
                {...register("celular")}
                className={`form-input ${errors.celular ? "error" : ""}`}
                placeholder="(11) 99999-9999"
              />
              {errors.celular && (
                <p className="error-message">{errors.celular.message}</p>
              )}
            </div>

            {/* Motorista e Carro */}
            <div className="form-field">
              <label className="form-label">
                <Car className="w-4 h-4 mr-2" />É motorista e possui carro?
              </label>
              <div className="flex space-x-6">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="true"
                    {...register("motorista")}
                    className="radio-input"
                  />
                  <span className="ml-2 text-gray-700 font-medium">Sim</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="false"
                    {...register("motorista")}
                    className="radio-input"
                  />
                  <span className="ml-2 text-gray-700 font-medium">Não</span>
                </label>
              </div>
            </div>

            {/* Disponibilidade */}
            <div className="form-field">
              <label className="form-label">
                <Calendar className="w-4 h-4 mr-2" />
                DISPONIBILIDADE *
              </label>
              <div className="radio-group">
                <label className="radio-option">
                  <input
                    type="radio"
                    value="ambos"
                    {...register("disponibilidade")}
                    className="radio-input"
                  />
                  <span className="radio-label">
                    <strong>Dia 20 (sábado) e 21 (domingo) de Setembro</strong>
                    <br />
                    <span className="text-sm text-gray-500">
                      Disponível para ambos os dias
                    </span>
                  </span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    value="sabado"
                    {...register("disponibilidade")}
                    className="radio-input"
                  />
                  <span className="radio-label">
                    <strong>Dia 20 (sábado) de Setembro</strong>
                    <br />
                    <span className="text-sm text-gray-500">Apenas sábado</span>
                  </span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    value="domingo"
                    {...register("disponibilidade")}
                    className="radio-input"
                  />
                  <span className="radio-label">
                    <strong>Dia 21 (domingo) de Setembro</strong>
                    <br />
                    <span className="text-sm text-gray-500">
                      Apenas domingo
                    </span>
                  </span>
                </label>
              </div>
              {errors.disponibilidade && (
                <p className="error-message">
                  Selecione uma opção de disponibilidade
                </p>
              )}
            </div>

            {/* Instrumento */}
            <div className="form-field">
              <label className="form-label">
                <Music className="w-4 h-4 mr-2" />
                Qual instrumento toca?
              </label>
              <input
                type="text"
                {...register("instrumento")}
                className="form-input"
                placeholder="Ex: Violino, Trompete, Tuba, etc. (opcional)"
              />
            </div>

            {/* Congregação */}
            <div className="form-field">
              <label className="form-label">
                <Church className="w-4 h-4 mr-2" />
                Congregação *
              </label>
              <input
                type="text"
                {...register("congregacao")}
                className={`form-input ${errors.congregacao ? "error" : ""}`}
                placeholder="Digite o nome da sua congregação"
              />
              {errors.congregacao && (
                <p className="error-message">{errors.congregacao.message}</p>
              )}
            </div>

            {/* Botão de Envio */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Enviando...
                  </div>
                ) : (
                  "Enviar Cadastro"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500 animate-fade-in">
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
