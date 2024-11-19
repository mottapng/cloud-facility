import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  environment: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 5555,

  database: {
    uri: process.env.MONGODB_URI,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      retryWrites: true,
    },
  },

  mqtt: {
    brokerUrl: process.env.MQTT_BROKER_URL,
    topic: process.env.MQTT_TOPIC,
    options: {
      username: process.env.MQTT_USERNAME,
      password: process.env.MQTT_PASSWORD,
      reconnectPeriod: 5000,
      keepalive: 60,
    },
  },

  websocket: {
    cors: {
      origin: process.env.WS_CORS_ORIGIN || '*',
      credentials: true,
    },
  },
}));
