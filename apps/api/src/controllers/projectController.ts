import { Request, Response } from 'express';
import { prisma } from '@nexa/db';

export const projectController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const projects = await prisma.project.findMany({
        orderBy: { updatedAt: 'desc' },
        include: { property: { select: { address: true } } }
      });
      res.json({ data: projects });
    } catch (error) {
      console.error('[ProjectController] Error fetching projects:', error);
      res.status(500).json({ error: 'Failed to fetch projects' });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const project = await prisma.project.findUnique({
        where: { id: req.params.id },
        include: { property: true }
      });
      
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
      res.json({ data: project });
    } catch (error) {
      console.error(`[ProjectController] Error fetching project ${req.params.id}:`, error);
      res.status(500).json({ error: 'Failed to fetch project details' });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const newProject = await prisma.project.create({
        data: req.body
      });
      res.status(201).json({ data: newProject });
    } catch (error) {
      console.error('[ProjectController] Error creating project:', error);
      res.status(500).json({ error: 'Failed to create project' });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const updatedProject = await prisma.project.update({
        where: { id: req.params.id },
        data: req.body
      });
      res.json({ data: updatedProject });
    } catch (error) {
      console.error(`[ProjectController] Error updating project ${req.params.id}:`, error);
      res.status(500).json({ error: 'Failed to update project' });
    }
  }
};
