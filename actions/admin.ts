"use server";

import { signOut } from "@/auth";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  CreateAdminPageSchema,
  EditCategorySchema,
  EditPageDescriptionSchema,
  EditPageTitleSchema,
  EditPriceSchema,
  PageSchema,
} from "@/schemas";
import { writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { join } from "path";
import * as z from "zod";

export const createPage = async (
  values: z.infer<typeof CreateAdminPageSchema>
) => {
  const user = await currentUser();
  if (!user || !user.id) {
    await signOut({ redirectTo: "/login", redirect: true });
    return;
  }
  const validatedFields = CreateAdminPageSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { title } = validatedFields.data;

  const page = await db.page.create({
    data: {
      title,
      userId: user.id,
    },
  });

  revalidatePath(`/admin/${page.id}`);

  return { success: "생성 성공했습니다", pageId: page.id };
};

export const editTitlePage = async (
  values: z.infer<typeof EditPageTitleSchema>
) => {
  const user = await currentUser();
  if (!user || !user.id) {
    await signOut({ redirectTo: "/login", redirect: true });
    return;
  }

  const validatedFields = EditPageTitleSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { title, pageId } = validatedFields.data;

  const page = await db.page.findUnique({
    where: {
      id: pageId,
    },
  });

  if (!page) {
    return { error: "잘못된 정보입니다." };
  }

  await db.page.update({
    where: {
      id: page.id,
    },
    data: {
      title: title,
    },
  });

  revalidatePath(`/admin/${pageId}`);

  return { success: "제목 수정 성공했습니다" };
};

export const editDescriptionPage = async (
  values: z.infer<typeof EditPageDescriptionSchema>
) => {
  const user = await currentUser();
  if (!user || !user.id) {
    await signOut({ redirectTo: "/login", redirect: true });
    return;
  }

  const validatedFields = EditPageDescriptionSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { description, pageId } = validatedFields.data;

  const page = await db.page.findUnique({
    where: {
      id: pageId,
    },
  });

  if (!page) {
    return { error: "잘못된 정보입니다." };
  }

  await db.page.update({
    where: {
      id: page.id,
    },
    data: {
      description,
    },
  });

  revalidatePath(`/admin/${pageId}`);

  return { success: "수정 성공했습니다" };
};

export const editImageUrlPage = async (values: FormData) => {
  const user = await currentUser();
  if (!user || !user.id) {
    await signOut({ redirectTo: "/login", redirect: true });
    return;
  }

  const file: File | null = values.get("file") as unknown as File;
  const pageId: string | null = values.get("pageId") as unknown as string;

  if (!file) {
    return { error: "파일이 없습니다" };
  }

  const page = await db.page.findUnique({
    where: {
      id: pageId,
    },
  });

  if (!page) {
    return { error: "잘못된 정보입니다." };
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // 확장자 검사하고 fileid 별도로 만들면 좋겠지만 이건 연습용
  const imageFilePath = join(
    process.cwd(),
    "public",
    "images",
    page.id + ".png"
  );
  await writeFile(imageFilePath, buffer, { flag: "w" });
  const imageUrl = `/images/${page.id}.png`;

  await db.page.update({
    where: {
      id: page.id,
    },
    data: {
      imageUrl,
    },
  });

  revalidatePath(`/admin/${pageId}`);

  return { success: "수정 성공했습니다", imageUrl };
};

export const editCategoryPage = async (
  values: z.infer<typeof EditCategorySchema>
) => {
  const user = await currentUser();
  if (!user || !user.id) {
    await signOut({ redirectTo: "/login", redirect: true });
    return;
  }

  const validatedFields = EditCategorySchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { categoryId, pageId } = validatedFields.data;

  const page = await db.page.findUnique({
    where: {
      id: pageId,
    },
  });

  if (!page) {
    return { error: "잘못된 정보입니다." };
  }

  await db.page.update({
    where: {
      id: page.id,
    },
    data: {
      categoryId,
    },
  });

  revalidatePath(`/admin/${pageId}`);

  return { success: "수정 성공했습니다" };
};

export const editPrice = async (values: z.infer<typeof EditPriceSchema>) => {
  const user = await currentUser();
  if (!user || !user.id) {
    await signOut({ redirectTo: "/login", redirect: true });
    return;
  }

  const validatedFields = EditPriceSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { price, pageId } = validatedFields.data;

  const page = await db.page.findUnique({
    where: {
      id: pageId,
    },
  });

  if (!page) {
    return { error: "잘못된 정보입니다." };
  }

  await db.page.update({
    where: {
      id: page.id,
    },
    data: {
      price,
    },
  });

  revalidatePath(`/admin/${pageId}`);

  return { success: "수정 성공했습니다" };
};

export const deletePage = async (values: z.infer<typeof PageSchema>) => {
  const user = await currentUser();
  if (!user || !user.id) {
    await signOut({ redirectTo: "/login", redirect: true });
    return;
  }

  const validatedFields = PageSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { pageId } = validatedFields.data;

  const page = await db.page.findUnique({
    where: {
      id: pageId,
      userId: user.id,
    },
  });

  if (!page) {
    return { error: " 잘못된 정보입니다." };
  }

  await db.page.delete({
    where: {
      id: pageId,
    },
  });

  revalidatePath("/admin/home");
  redirect("/admin/home");

  return { success: "삭제 했습니다" };
};

export const publishPage = async (values: z.infer<typeof PageSchema>) => {
  const user = await currentUser();
  if (!user || !user.id) {
    await signOut({ redirectTo: "/login", redirect: true });
    return;
  }

  const validatedFields = PageSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { pageId } = validatedFields.data;

  const page = await db.page.findUnique({
    where: {
      id: pageId,
      userId: user.id,
    },
    include: {
      items: true,
    },
  });

  if (!page) {
    return { error: "잘못된 정보입니다." };
  }

  const hasPublishedItems = page.items.some((item) => item.isPublished);

  if (
    !page.title ||
    !page.description ||
    !page.imageUrl ||
    !page.categoryId ||
    !hasPublishedItems
  ) {
    return { error: "입력 정보가 부족합니다." };
  }

  await db.page.update({
    where: {
      id: page.id,
    },
    data: {
      isPublished: true,
    },
  });

  revalidatePath(`/admin/${pageId}`);

  return { success: "게시 했습니다" };
};

export const unpublishPage = async (values: z.infer<typeof PageSchema>) => {
  const user = await currentUser();
  if (!user || !user.id) {
    await signOut({ redirectTo: "/login", redirect: true });
    return;
  }

  const validatedFields = PageSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { pageId } = validatedFields.data;

  const page = await db.page.findUnique({
    where: {
      id: pageId,
      userId: user.id,
    },
  });

  if (!page) {
    return { error: "잘못된 정보입니다." };
  }

  await db.page.update({
    where: {
      id: page.id,
    },
    data: {
      isPublished: false,
    },
  });

  revalidatePath(`/admin/${pageId}`);

  return { success: "게시 했습니다" };
};
