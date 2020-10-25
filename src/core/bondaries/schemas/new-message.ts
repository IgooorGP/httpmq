import * as z from 'zod';

const NewMessageRequestDto = z.object({
    headers: z.object({
        destination: z.string().max(100)
    }),
    message: z.union([
        z.string(), z.object({
            message: z.string()
        })
    ]),
});

export { NewMessageRequestDto };
