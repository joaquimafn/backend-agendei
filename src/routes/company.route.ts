import { prisma } from "@/lib/prisma";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export async function Company(app: FastifyInstance) {
  const schemaCreate = z.object({
    name: z.string(),
    address: z.string(),
    showAmountServices: z.boolean().default(false),
  });

  // const schemaUpdateConfirmed = z.object({
  //   appointmentId: z.string(),
  // });

  app.withTypeProvider<ZodTypeProvider>().post(
    "/companies",
    {
      schema: {
        body: schemaCreate,
      },
    },
    async (request, reply) => {
      const bodyData = request.body;

      let firstName = bodyData.name.toLowerCase().replace(" ", "");

      await prisma.company.create({
        data: {
          ...bodyData,
          link: process.env.APP_URL + "/" + firstName,
        },
      });

      return reply.status(201).send();
    }
  );

  app.get("/companies", async (request, reply) => {
    const appointments = await prisma.company.findMany();

    return reply.status(200).send(appointments);
  });

  // app.withTypeProvider<ZodTypeProvider>().patch(
  //   "/appointments",
  //   {
  //     schema: {
  //       body: schemaUpdateConfirmed,
  //     },
  //   },
  //   async (request, reply) => {
  //     const { appointmentId } = request.body;

  //     // const verifyHasConfirmed = await prisma.appointment.

  //     await prisma.appointment.update({
  //       where: {
  //         id: appointmentId,
  //       },
  //       data: {
  //         is_confirmed: true,
  //       },
  //     });

  //     return reply.status(200).send();
  //   }
  // );
}
