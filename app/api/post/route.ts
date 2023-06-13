import { NextResponse } from 'next/server';
import prisma from '../../../prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { NextPageContext } from 'next';

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

export async function DELETE(req: Request) {
  try {
    // get search parameters (DELETE requests SHOULD NOT HAVE A BODY)
    const { searchParams } = new URL(req.url);
    const postId = Number(searchParams.get('postId'));

    if (!postId)
      return NextResponse.json(
        { error: 'Não é possível apagar um post sem um id' },
        { status: 400 }
      );
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
    const postToBeDeleted = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        user: true,
      },
    });

    // checks if user owns this post
    if (postToBeDeleted?.userId !== currentUser.id) {
      return NextResponse.json(
        { error: 'You need to own a post to be able to delete id' },
        { status: 403 }
      );
    }

    await prisma.post.delete({
      where: {
        id: postToBeDeleted.id,
      },
    });

    // retornar uma resposta positiva
    return NextResponse.json(
      { mensagem: 'Post deleted successfully' },
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
