import { BaseEntity } from '../common/base.entity'; // Adjust the path as necessary
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Contract } from '../contract/contract.entity'; // Import the Contract entity

@Entity('payment')
export class Payment extends BaseEntity {
    @Column()
    contractId: number;

    @ManyToOne(() => Contract, (contract) => contract.payments, { eager: true })
    @JoinColumn({ name: 'contractId' }) // Establish foreign key relationship with Contract
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

    @Column({nullable: true})
    payment_type: string;

    @Column({ nullable: true })
    file_url: string; // Nullable field for file URL
} 