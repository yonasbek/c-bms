import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contract } from '../contract/contract.entity';
import { Room } from '../room/room.entity';
import { User } from '../users/users.entity';
import { Payment } from '../payment/payment.entity';
import { ContractDocument } from '../contract-document/contract-document.entity';
import { MaintenanceRequest } from '../maintenance/maintenance.entity';
import { Floor } from '../floor/floor.entity';
import { BuildingTenant } from 'src/building-tenant/building-tenant.entity';
import { SubContract } from 'src/subcontract/subcontract.entity';
@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Contract)
    private readonly contractRepository: Repository<Contract>,
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(ContractDocument)
    private readonly documentRepository: Repository<ContractDocument>,
    @InjectRepository(MaintenanceRequest)
    private readonly maintenanceRepository: Repository<MaintenanceRequest>,
    @InjectRepository(Floor)
    private readonly floorRepository: Repository<Floor>,
    @InjectRepository(BuildingTenant)
    private readonly buildingTenantRepository: Repository<BuildingTenant>,
    @InjectRepository(SubContract)
    private readonly subContractRepository: Repository<SubContract>,
  ) {}

  async generateReport(id: string): Promise<any> {
    const reportData = await this.aggregateData(id);
    return reportData;
  }

  private async aggregateData(id: string) {
    const [
      totalContracts,
      totalRooms,
      totalUsers,
      totalPayments,
      totalDocuments,
      activeContracts,
      pendingPayments,
      pendingMaintenance,
      vacantRooms,
      totalFloors,
      totalSubContracts
    ] = await Promise.all([
      this.contractRepository.find({where: {room: {floor: {buildingId: parseInt(id)}}}}),
      this.roomRepository.find({where: {floor: {buildingId: parseInt(id)}}}),
      this.buildingTenantRepository.find({where: {buildingId: parseInt(id)}}),
      this.paymentRepository.find({where: {contract: {room: {floor: {buildingId: parseInt(id)}}}}}),
      this.documentRepository.find({where: {contract: {room: {floor: {buildingId: parseInt(id)}}}}}),
      this.contractRepository.find({ where: { contract_status: 'active', room: {floor: {buildingId: parseInt(id)}}}}),
      this.paymentRepository.find({ where: { payment_status: 'pending', contract: {room:{ floor: {buildingId: parseInt(id)}}} } }),
      this.maintenanceRepository.find({ where: { request_status: 'pending', room: {floor: {buildingId: parseInt(id) }}} }),
      this.roomRepository.find({ where: { room_status: 'vacant', floor: { buildingId: parseInt(id) } } }),
      this.floorRepository.find({where: {buildingId: parseInt(id)}}),
      this.subContractRepository.find({where: {buildingId: id}})
    ]);

    const reportData = {
      total_contracts: totalContracts.length,
      total_rooms: totalRooms.length,
      total_users: totalUsers.length,
      total_payments: totalPayments.length,
      total_documents: totalDocuments.length,
      active_contracts: activeContracts.length,
      pending_payments: pendingPayments.length,
      pending_maintenance: pendingMaintenance.length,
      vacant_rooms: vacantRooms.length,
      occupancy_rate: ((totalRooms.length - vacantRooms.length) / totalRooms.length) * 100,
      total_floors: totalFloors.length,
      total_sub_contracts: totalSubContracts.length
    };

    return reportData;
  }

//   async getLatestReport(): Promise<Report> {
//     return this.reportRepository.findOne({
//       order: { generated_at: 'DESC' },
//     });
//   }

//   async getReportsByDateRange(start: Date, end: Date): Promise<Report[]> {
//     return this.reportRepository.find({
//       where: {
//         generated_at: {
//           $gte: start,
//           $lte: end,
//         },
//       },
//       order: { generated_at: 'DESC' },
//     });
//   }

//   async getSystemStats() {
//     const [
//       totalContracts,
//       totalRooms,
//       totalUsers,
//       totalPayments,
//       totalDocuments,
//       activeContracts,
//       pendingPayments,
//     ] = await Promise.all([
//       this.contractRepository.count(),
//       this.roomRepository.count(),
//       this.userRepository.count(),
//       this.paymentRepository.count(),
//       this.documentRepository.count(),
//       this.contractRepository.count({ where: { contract_status: 'active' } }),
//       this.paymentRepository.count({ where: { status: 'pending' } }),
//     ]);

//     return {
//       total_contracts: totalContracts,
//       total_rooms: totalRooms,
//       total_users: totalUsers,
//       total_payments: totalPayments,
//       total_documents: totalDocuments,
//       active_contracts: activeContracts,
//       pending_payments: pendingPayments,
//     };
//   }

//   async getContractStats() {
//     const contracts = await this.contractRepository.find({
//       relations: ['payments', 'contractDocuments'],
//     });

//     const stats = {
//       total: contracts.length,
//       active: contracts.filter(c => c.contract_status === 'active').length,
//       expired: contracts.filter(c => c.contract_status === 'expired').length,
//       pending: contracts.filter(c => c.contract_status === 'pending').length,
//       average_rent: contracts.reduce((acc, curr) => acc + curr.monthly_rent, 0) / contracts.length,
//       total_documents: contracts.reduce((acc, curr) => acc + curr.contractDocuments.length, 0),
//       total_payments: contracts.reduce((acc, curr) => acc + curr.payments.length, 0),
//     };

//     return stats;
//   }

//   async getRoomStats() {
//     const rooms = await this.roomRepository.find({
//       relations: ['contracts'],
//     });

//     const stats = {
//       total: rooms.length,
//       occupied: rooms.filter(r => r.contracts?.some(c => c.contract_status === 'active')).length,
//       available: rooms.filter(r => !r.contracts?.some(c => c.contract_status === 'active')).length,
//       average_contracts: rooms.reduce((acc, curr) => acc + (curr.contracts?.length || 0), 0) / rooms.length,
//     };

//     return stats;
//   }

//   async getPaymentStats() {
//     const payments = await this.paymentRepository.find();

//     const stats = {
//       total: payments.length,
//       pending: payments.filter(p => p.status === 'pending').length,
//       completed: payments.filter(p => p.status === 'completed').length,
//       failed: payments.filter(p => p.status === 'failed').length,
//       total_amount: payments.reduce((acc, curr) => acc + curr.amount, 0),
//       average_amount: payments.reduce((acc, curr) => acc + curr.amount, 0) / payments.length,
//     };

//     return stats;
//   }
} 