import { Request, Response } from 'express';
import { prisma } from '@nexa/db';

export const dealController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const deals = await prisma.deal.findMany({
        orderBy: { updatedAt: 'desc' },
        include: { property: { select: { address: true } } }
      });
      res.json({ data: deals });
    } catch (error) {
      console.error('[DealController] Error fetching deals:', error);
      res.status(500).json({ error: 'Failed to fetch deals' });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const deal = await prisma.deal.findUnique({
        where: { id: req.params.id },
        include: { property: true }
      });
      
      if (!deal) {
        return res.status(404).json({ error: 'Deal not found' });
      }
      res.json({ data: deal });
    } catch (error) {
      console.error(`[DealController] Error fetching deal ${req.params.id}:`, error);
      res.status(500).json({ error: 'Failed to fetch deal details' });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const newDeal = await prisma.deal.create({
        data: req.body
      });
      res.status(201).json({ data: newDeal });
    } catch (error) {
      console.error('[DealController] Error creating deal:', error);
      res.status(500).json({ error: 'Failed to create deal' });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const updatedDeal = await prisma.deal.update({
        where: { id: req.params.id },
        data: req.body
      });
      res.json({ data: updatedDeal });
    } catch (error) {
      console.error(`[DealController] Error updating deal ${req.params.id}:`, error);
      res.status(500).json({ error: 'Failed to update deal' });
    }
  }
};
