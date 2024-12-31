// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "컴퓨터 사이언스" },
        { name: "음악" },
        { name: "건강" },
        { name: "사진" },
        { name: "금융" },
        { name: "영상" },
        { name: "엔지니어링" },
      ],
    });
    console.log("성공");
  } catch (error) {
    console.log("카테고리 데이터 생성 실패", error);
  } finally {
    await database.$disconnect();
  }
}

main();
