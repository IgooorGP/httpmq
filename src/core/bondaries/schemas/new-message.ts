import * as z from "zod";

const NewMessageDtoSchema = z.object({
  headers: z.object({
    destination: z.string().max(100),
  }),
  message: z.object({
    message: z.string(),
  }),
});

type NewMessageDto = z.infer<typeof NewMessageDtoSchema>;

export { NewMessageDto, NewMessageDtoSchema };
