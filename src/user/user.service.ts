import { HttpException, Injectable } from '@nestjs/common';
//* ๐ฉ
import { User, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prismae.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  //* ์ ์  ์์ฑ
  async createUser(data): Promise<User> {
    // ์ค๋ณต ์ ์  ์ฒดํฌ
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    console.log('์ด๋ฉ์ผ๋ก ์ฌ์ฉ์๋ฅผ ์ฐพ์ต๋๋ค..');
    if (user) {
      console.log('์ฐพ์์ต๋๋ค ์ค๋ณต๋ฐ๊ฒฌ!..');
      console.log(user);
      throw new HttpException('์ค๋ณต๋ Email์๋๋ค.', 401);
    }

    return this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
      },
    });
  }

  async updateUser(data) {
    // const { where, data } = params;
    // throw new HttpException('์พ', 500);
    // ์กด์ฌํ๋ ์ฌ์ฉ์ ์ธ์ง ์ด๋ฉ์ผ๋ก ์ฒดํฌ
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    console.log('์์ ํ๊ธฐ์ ์ ์ฌ์ฉ์๋ฅผ ์ฐพ์ต๋๋ค');
    if (!user) {
      console.log('๋ชป์ฐพ์์ต๋๋ค');
      throw new HttpException('์๋ฐ์ดํธํ  ์ฌ์ฉ์๋ฅผ ๋ชป์ฐพ์์ต๋๋ค', 404);
    }

    return this.prisma.user.update({
      where: {
        email: data.email,
      },
      data: {
        name: data.name,
      },
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }

  //* ์ ์  ์์ธ ์กฐํ
  async findUser(id: number) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
}
