import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { ApplicationModule } from './application/application.module';
import { InterfacesModule } from './interfaces/interfaces.module';

@Module({
  imports: [InfrastructureModule, ApplicationModule, InterfacesModule],
})
export class AppModule {}
