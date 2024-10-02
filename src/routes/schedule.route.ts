import { prisma } from "@/lib/prisma";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export async function Schedule(app: FastifyInstance) {
  const schemaCreate = z.object({
    date: z.string(),
    hour: z.string(),
    clientId: z.string(),
    serviceId: z.string(),
  });

  app.withTypeProvider<ZodTypeProvider>().post(
    "/schedules",
    {
      schema: {
        body: schemaCreate,
      },
    },
    async (request, reply) => {
      const bodyData = request.body;

      await prisma.appointment.create({
        data: bodyData,
      });

      return reply.status(201).send();
    }
  );

  app.get("/schedules", async (request, reply) => {
    const schedules = await prisma.schedule.findMany();

    return reply.status(200).send(schedules);
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
