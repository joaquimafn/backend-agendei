import fastify from "fastify";
import { Appointment } from "./routes/appointment.route";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import cors from "@fastify/cors";
import { Company } from "./routes/company.route";
import { Service } from "./routes/service.route";
import { Schedule } from "./routes/schedule.route";

const app = fastify();

app.register(cors, {
  origin: "*",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(Appointment);
app.register(Company);
app.register(Service);
app.register(Schedule);

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("Server running ✅");
  });
