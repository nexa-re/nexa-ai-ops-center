import { Request, Response } from 'express';
import { prisma } from '@nexa/db';

export const propertyController = {
  // GET /api/properties
  getAll: async (req: Request, res: Response) => {
    try {
      const properties = await prisma.property.findMany({
        orderBy: { updatedAt: 'desc' },
      });
      res.json({ data: properties });
    } catch (error) {
      console.error('[PropertyController] Error fetching properties:', error);
      res.status(500).json({ error: 'Failed to fetch properties' });
    }
  },

  // GET /api/properties/:id
  getById: async (req: Request, res: Response) => {
    try {
      const property = await prisma.property.findUnique({
        where: { id: req.params.id as string },
        include: { projects: true, deals: true }
      });
      
      if (!property) {
        return res.status(404).json({ error: 'Property not found' });
      }
      res.json({ data: property });
    } catch (error) {
      console.error(`[PropertyController] Error fetching property ${req.params.id}:`, error);
      res.status(500).json({ error: 'Failed to fetch property details' });
    }
  },

  // POST /api/properties
  create: async (req: Request, res: Response) => {
    try {
      const { address, city, state, zipCode, propertyType, status, ...rest } = req.body;
      
      const newProperty = await prisma.property.create({
        data: {
          address,
          city,
          state,
          zipCode,
          propertyType,
          status,
          ...rest
        }
      });
      res.status(201).json({ data: newProperty });
    } catch (error) {
      console.error('[PropertyController] Error creating property:', error);
      res.status(500).json({ error: 'Failed to create property' });
    }
  },

  // PUT /api/properties/:id
  update: async (req: Request, res: Response) => {
    try {
      const updatedProperty = await prisma.property.update({
        where: { id: req.params.id as string },
        data: req.body
      });
      res.json({ data: updatedProperty });
    } catch (error) {
      console.error(`[PropertyController] Error updating property ${req.params.id}:`, error);
      res.status(500).json({ error: 'Failed to update property' });
    }
  }
};
