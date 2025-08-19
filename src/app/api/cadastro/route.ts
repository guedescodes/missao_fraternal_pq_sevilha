import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { promises as fs } from "fs";
import path from "path";

// Schema de validação para a API
const cadastroSchema = z.object({
  nomeCompleto: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  idade: z.number().min(1, "Idade é obrigatória").max(120, "Idade inválida"),
  celular: z.string().min(10, "Celular deve ter pelo menos 10 dígitos"),
  motorista: z.boolean(),
  disponibilidade: z.enum(["ambos", "sabado", "domingo"]),
  instrumento: z.string().optional(),
  congregacao: z.string().min(1, "Congregação é obrigatória"),
});

type Cadastro = z.infer<typeof cadastroSchema> & {
  id: string;
  dataCadastro: string;
};

// Armazenamento temporário em memória para produção
let cadastrosEmMemoria: Cadastro[] = [];

// Função para ler os dados do arquivo JSON (apenas em desenvolvimento)
async function readCadastros() {
  try {
    // Em produção, usar memória
    if (process.env.NODE_ENV === 'production') {
      return { cadastros: cadastrosEmMemoria };
    }
    
    const dataPath = path.join(process.cwd(), "data", "cadastros.json");
    const fileContent = await fs.readFile(dataPath, "utf-8");
    return JSON.parse(fileContent);
  } catch {
    // Se o arquivo não existir, retorna estrutura vazia
    return { cadastros: [] };
  }
}

// Função para salvar os dados (apenas em desenvolvimento)
async function saveCadastros(data: { cadastros: Cadastro[] }) {
  try {
    // Em produção, usar memória
    if (process.env.NODE_ENV === 'production') {
      cadastrosEmMemoria = data.cadastros;
      return;
    }
    
    const dataPath = path.join(process.cwd(), "data", "cadastros.json");
    await fs.writeFile(dataPath, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Erro ao salvar dados:", error);
    // Em caso de erro, usar memória como fallback
    cadastrosEmMemoria = data.cadastros;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validar dados recebidos
    const validatedData = cadastroSchema.parse(body);

    // Adicionar timestamp e ID único
    const novoCadastro: Cadastro = {
      id: Date.now().toString(),
      ...validatedData,
      dataCadastro: new Date().toISOString(),
    };

    // Ler dados existentes
    const dadosExistentes = await readCadastros();

    // Adicionar novo cadastro
    dadosExistentes.cadastros.push(novoCadastro);

    // Salvar dados
    await saveCadastros(dadosExistentes);

    // Log dos dados recebidos (remover em produção)
    console.log("Novo cadastro recebido:", novoCadastro);

    // Retornar sucesso
    return NextResponse.json(
      {
        success: true,
        message: "Cadastro realizado com sucesso!",
        data: novoCadastro,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao processar cadastro:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Dados inválidos",
          errors: error.issues,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Erro interno do servidor",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const dados = await readCadastros();
    
    return NextResponse.json({
      message: "API de Cadastro da Missão Fraternal",
      version: "1.0.0",
      totalCadastros: dados.cadastros.length,
      environment: process.env.NODE_ENV,
      endpoints: {
        POST: "/api/cadastro - Enviar novo cadastro",
        GET: "/api/cadastro - Listar todos os cadastros",
      },
      cadastros: dados.cadastros,
    });
  } catch (error) {
    console.error("Erro ao ler cadastros:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao ler cadastros",
      },
      { status: 500 }
    );
  }
}
