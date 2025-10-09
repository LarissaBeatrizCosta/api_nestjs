import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CompaniesService {
  private readonly companies: Company[] = [];
  private uuid = uuidv4();

  create(createCompanyDto: CreateCompanyDto) {
    const newCompany: Company = {
      id: this.uuid,
      ...createCompanyDto,
    };
    this.companies.push(newCompany);
    return newCompany;
  }

  findAll() {
    return `This action returns all companies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
