// import Fuse from "fuse.js"
import { prisma } from "@/database/prisma"
import { AppError } from "@/utils/AppError"

export async function checkSimilarBookTitle(title: string) {
  const Fuse = (await import("fuse.js")).default

  const allBooks = await prisma.book.findMany({
    select: { title: true }
  })

  const fuse = new Fuse(allBooks, {
    keys: ["title"],
    threshold: 0.3
  })

  const results = fuse.search(title)

  if (results.length > 0) {
    const similarTitle = results[0].item.title
    throw new AppError(`Título similar já existe: '${similarTitle}'`)
  }
}