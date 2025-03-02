import { BaseEntity } from '../common/base.entity'; // Adjust the path as necessary
import { Entity, Column, ManyToOne } from 'typeorm';
import { Contract } from '../contract/contract.entity'; // Import the Contract entity

@Entity('payment')
export class Payment extends BaseEntity {
    @ManyToOne(() => Contract, (contract) => contract.payments, { eager: true }) // Establish foreign key relationship with Contract
    contract: Contract;

    @Column()
    reference_number: string;

    @Column()
    payment_status: string;

    @Column()
    payment_from: Date;

    @Column()
    payment_to: Date;

    @Column()
    payment_date: Date;

    @Column({ nullable: true })
    file_url: string; // Nullable field for file URL
} 