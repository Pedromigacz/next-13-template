import { NextResponse } from 'next/server';
import prisma from '../../../prisma/client';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(req: Request) {
  // verificar se o usuário está logado

  // Pegar o title do body
  const { title } = await req.json();

  // verificar se há um "title" dentro do body e se ele está vazio ou não
  if (!title || title.length < 1)
    return NextResponse.json(
      { error: 'Titulo é um campo obrigatório' },
      { status: 400 }
    );

  // verificar se o title tem menos de 300 characteres de comprimento
  if (title.length > 300)
    return NextResponse.json(
      { error: 'Limite de caractéres excedido' },
      { status: 400 }
    );

  try {
    const session = await getServerSession(authOptions);

    if (!session)
      return NextResponse.json(
        { error: 'You need to be logged in to do that' },
        { status: 403 }
      );

    const currentUser = await prisma.user.findUnique({
      where: {
        email: String(session.user?.email),
      },
    });

    if (!currentUser)
      return NextResponse.json(
        { error: 'You need to be logged in to do that' },
        { status: 403 }
      );

    // salvar o post na base de dados
    const newPost = await prisma.post.create({
      data: {
        title: title,
        userId: currentUser.id,
      },
    });

    // retornar uma resposta positiva
    return NextResponse.json(
      { mensagem: 'Post salvo com sucesso!', newPost: newPost },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }

  // se algo de errado inesperadamente ocorre, retornar um erro status 500
}
