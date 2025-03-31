import { z } from 'zod';
import { NextResponse } from 'next/server';

const contactSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères")
    .max(500, "Le message ne doit pas dépasser 500 caractères"),
  phone: z.string().regex(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/, "Numéro de téléphone français invalide")
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const result = contactSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json({
        success: false,
        errors: result.error.errors.map(err => ({
          field: err.path[0],
          message: err.message
        }))
      }, { status: 400 });
    }

    return NextResponse.json({
      success: true
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      errors: [{ message: `Une erreur est survenue: ${error}` }]
    }, { status: 500 });
  }
} 