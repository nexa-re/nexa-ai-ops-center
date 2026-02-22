import { Request, Response } from 'express';
import { prisma } from '@nexa/db';

export const documentController = {
  // GET /api/documents
  getAll: async (req: Request, res: Response) => {
    try {
      const documents = await prisma.document.findMany({
        orderBy: { uploadedAt: 'desc' },
      });
      res.json({ data: documents });
    } catch (error) {
      console.error('[DocumentController] Error fetching documents:', error);
      res.status(500).json({ error: 'Failed to fetch documents' });
    }
  },

  // POST /api/documents/upload
  // Mocks an upload and triggers an OCR processing job
  upload: async (req: Request, res: Response) => {
    try {
      const { fileName, fileType, fileUrl } = req.body;
      
      const newDoc = await prisma.document.create({
        data: {
          fileName: fileName || 'Untitled.pdf',
          fileType: fileType || 'application/pdf',
          fileUrl: fileUrl || 'https://example.com/mock.pdf',
          ocrStatus: 'Processing',
        }
      });
      
      // Simulate async OCR Processing
      setTimeout(async () => {
        try {
          await prisma.document.update({
            where: { id: newDoc.id },
            data: {
              ocrStatus: 'Completed',
              extractedText: 'MOCK OCR TEXT: This real estate document contains standard clauses regarding property transfer, escrows, and financial liabilities. The address recognized is 123 Nexa Blvd.',
            }
          });
          console.log(`[OCR] Processing completed for ${newDoc.fileName}`);
        } catch (err) {
          console.error('[OCR] Processing failed', err);
        }
      }, 5000); // 5 second mock delay

      res.status(202).json({ 
        message: 'File uploaded successfully. OCR Processing started.',
        data: newDoc 
      });
    } catch (error) {
      console.error('[DocumentController] Error uploading document:', error);
      res.status(500).json({ error: 'Failed to upload document' });
    }
  },

  // GET /api/documents/:id
  getById: async (req: Request, res: Response) => {
    try {
      const document = await prisma.document.findUnique({
        where: { id: req.params.id as string },
      });
      
      if (!document) {
        return res.status(404).json({ error: 'Document not found' });
      }
      res.json({ data: document });
    } catch (error) {
      console.error(`[DocumentController] Error fetching document ${req.params.id}:`, error);
      res.status(500).json({ error: 'Failed to fetch document' });
    }
  }
};
