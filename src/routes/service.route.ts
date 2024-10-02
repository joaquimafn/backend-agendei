import { prisma } from "@/lib/prisma";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export async function Service(app: FastifyInstance) {
  const schemaCreate = z.object({
    name: z.string(),
    amount: z.string(),
    companyId: z.string(),
  });

  // const schemaUpdateConfirmed = z.object({
  //   appointmentId: z.string(),
  // });

  app.withTypeProvider<ZodTypeProvider>().post(
    "/services",
    {
      schema: {
        body: schemaCreate,
      },
    },
    async (request, reply) => {
      const bodyData = request.body;

      await prisma.service.create({
        data: bodyData,
      });

      return reply.status(201).send();
    }
  );

  app.get("/services", async (request, reply) => {
    const appointments = await prisma.service.findMany();

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
