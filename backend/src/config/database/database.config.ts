import { registerAs } from '@nestjs/config';
import { validationSchema } from '../validation.schema';

export const databaseConfig = registerAs('database', () => {
  const env = validationSchema.parse(process.env);

  return {
    uri: env.MONGODB_URI,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      retryWrites: true,
      ssl: env.NODE_ENV === 'production',
    },
  };
});
