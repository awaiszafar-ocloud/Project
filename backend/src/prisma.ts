import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Optional: Add middleware
prisma.$use(async (params, next) => {
  // Example: Log all queries
  console.log('Query:', params.model, params.action)
  return next(params)
})

export default prisma