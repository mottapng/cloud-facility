import { z } from 'zod';

export const validationSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.string().default('5555'),

  MONGODB_URI: z.string(),

  MQTT_BROKER_URL: z.string(),
  MQTT_TOPIC: z.string(),
  MQTT_USERNAME: z.string().optional(),
  MQTT_PASSWORD: z.string().optional(),

  WS_CORS_ORIGIN: z.string().default('*'),
});

export type EnvConfig = z.infer<typeof validationSchema>;

export const validateConfig = (config: Record<string, unknown>) => {
  try {
    const result = validationSchema.parse(config);
    return result;
  } catch (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }
};
