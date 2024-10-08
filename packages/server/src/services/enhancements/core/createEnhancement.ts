import { EnhancementType, publisher, Role } from "@prisma/client"
import { prisma } from "../../../prisma"

export const createEnhancement = async (params: {
  includedTypes: EnhancementType[],
  title: string,
  bookId: string,
  publisherId?: string,
  userId?: string,
}) => {
  const { publisherId, userId, bookId, includedTypes, title } = params

  const existingEnhancement = await prisma.enhancement.findFirst({
    where: {
      book_id: bookId,
      included_types: {
        hasEvery: includedTypes,
      },
    },
  })

  if (existingEnhancement) {
    return existingEnhancement
  }

  const enhancement = await prisma.enhancement.create({
    data: {
      included_types: includedTypes,
      title: title,
      coalesced_data: {},
      coalesced_timestamp: new Date(),
      book: {
        connect: {
          id: bookId,
        },
      },
      publisher: publisherId ? {
        connect: {
          id: publisherId,
        },
      } : undefined,
    }
  })

  if (userId) {
    await prisma.subscription.create({
      data: {
        user_id: userId,
        enhancement_id: enhancement.id,
        role: Role.admin,
      },
    })
  }

  return enhancement
}