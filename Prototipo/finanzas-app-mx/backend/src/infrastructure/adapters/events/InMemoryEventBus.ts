import { EventBus } from "../../../application/ports/EventBus";

export class InMemoryEventBus implements EventBus {
  publish(event: any): void {
    console.log("[EVENT BUS] Published:", event);
    // Aquí conectarías con RabbitMQ / Redis / Kafka
  }
}
