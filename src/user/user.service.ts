import { HttpException, Injectable } from '@nestjs/common';
//* 🚩
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

  //* 유저 생성
  async createUser(data): Promise<User> {
    // 중복 유저 체크
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    console.log('이메일로 사용자를 찾습니다..');
    if (user) {
      console.log('찾았습니다 중복발견!..');
      console.log(user);
      throw new HttpException('중복된 Email입니다.', 401);
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
    // throw new HttpException('쾅', 500);
    // 존재하는 사용자 인지 이메일로 체크
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    console.log('수정하기전에 사용자를 찾습니다');
    if (!user) {
      console.log('못찾았습니다');
      throw new HttpException('업데이트할 사용자를 못찾았습니다', 404);
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

  //* 유저 상세 조회
  async findUser(id: number) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
}
