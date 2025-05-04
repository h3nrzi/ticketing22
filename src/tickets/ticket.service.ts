import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Ticket } from "./ticket.entity";
import { CreateTicketDto } from "./dto/create-ticket.dto";
import { UpdateTicketDto } from "./dto/update-ticket.dto";
import { User } from "../users/user.entity";
import { TicketStatus } from "./ticket-status.enum";

@Injectable()
export class TicketService {
	constructor(
		@InjectRepository(Ticket)
		private ticketRepository: Repository<Ticket>
	) {}

	private async findTicketById(id: number): Promise<Ticket> {
		const ticket = await this.ticketRepository.findOne({ where: { id } });
		if (!ticket) {
			throw new NotFoundException(`Ticket with ID ${id} not found`);
		}
		return ticket;
	}

	async create(createTicketDto: CreateTicketDto, user: User): Promise<Ticket> {
		const ticket = this.ticketRepository.create({
			...createTicketDto,
			user,
			status: TicketStatus.OPEN,
		});

		return this.ticketRepository.save(ticket);
	}

	async findAll(): Promise<Ticket[]> {
		return this.ticketRepository.find({
			relations: ["user"],
			order: { createdAt: "DESC" },
		});
	}

	async findOne(id: number): Promise<Ticket> {
		return this.findTicketById(id);
	}

	async update(id: number, updateTicketDto: UpdateTicketDto): Promise<Ticket> {
		const ticket = await this.findTicketById(id);
		Object.assign(ticket, updateTicketDto);
		return this.ticketRepository.save(ticket);
	}

	async remove(id: number): Promise<void> {
		const ticket = await this.findTicketById(id);
		await this.ticketRepository.remove(ticket);
	}

	async findByUser(userId: number): Promise<Ticket[]> {
		return this.ticketRepository.find({
			where: { user: { id: userId } },
			relations: ["user"],
			order: { createdAt: "DESC" },
		});
	}

	async updateStatus(id: number, status: TicketStatus): Promise<Ticket> {
		const ticket = await this.findTicketById(id);
		ticket.status = status;
		return this.ticketRepository.save(ticket);
	}
}
