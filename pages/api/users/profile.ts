import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const session = await getServerSession(req, res, authOptions)
    
    if (!session?.user?.id) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const { name, phone, address, bio } = req.body

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(session.user.id) },
      data: {
        name: name || undefined,
        phone: phone || undefined,
        address: address || undefined,
        bio: bio || undefined,
      },
    })

    return res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        address: updatedUser.address,
        bio: updatedUser.bio,
      }
    })
  } catch (error) {
    console.error('Error updating profile:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
} 