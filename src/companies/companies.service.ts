import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CompaniesService {
  private companies: Company[] = [
    {
      id: '1',
      name: 'Tech Solutions LTDA',
      cnpj: '12345678000199',
      active: true,
    },
    {
      id: '2',
      name: 'Comércio de Alimentos Bom Sabor',
      cnpj: '98765432000155',
      active: true,
    },
  ];

  private isValidCnpj(cnpj: string): boolean {
    const cleanedCnpj = cnpj.replace(/[^\d]/g, '');
    return cleanedCnpj.length === 14;
  }
  create(createCompanyDto: CreateCompanyDto) {
    if (!this.isValidCnpj(createCompanyDto.cnpj)) {
      throw new BadRequestException('CNPJ must be a valid 14 digit number');
    }
    const existingCompany = this.companies.find(
      (company) => company.cnpj === createCompanyDto.cnpj,
    );

    if (existingCompany) {
      throw new BadRequestException('Company with this CNPJ already exists');
    }
    try {
      const newCompany: Company = {
        id: uuidv4(),
        ...createCompanyDto,
      };
      this.companies.push(newCompany);
      return newCompany;
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Error creating company');
    }
  }

  findAll() {
    try {
      return this.companies;
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Error finding companies');
    }
  }

  findOne(id: string) {
    try {
      const company = this.companies.find((company) => company.id === id);
      if (!company) {
        throw new BadRequestException('Company not found');
      }
      return company;
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Error finding company');
    }
  }

  update(id: string, updateCompanyDto: UpdateCompanyDto) {
    if (updateCompanyDto.cnpj) {
      if (!this.isValidCnpj(updateCompanyDto.cnpj)) {
        throw new BadRequestException('CNPJ must be a valid 14 digit number');
      }
      const existingCnpj = this.companies.find(
        (c) => c.cnpj === updateCompanyDto.cnpj && c.id !== id,
      );

      if (existingCnpj) {
        throw new BadRequestException(
          'Another company with this CNPJ already exists',
        );
      }
    }
    try {
      const company = this.findOne(id);

      const updatedCompany = { ...company, ...updateCompanyDto };

      this.companies = this.companies.map((c) =>
        c.id === id ? updatedCompany : c,
      );

      return updatedCompany;
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Error updating company');
    }
  }

  remove(id: string) {
    try {
      this.findOne(id);

      this.companies = this.companies.filter((company) => company.id !== id);
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Error removing company');
    }
  }
}
