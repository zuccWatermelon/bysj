/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2018/1/24 14:40:30                           */
/*==============================================================*/


drop table if exists CPU;

drop table if exists CPU_MEMORY;

drop table if exists CUSTOMER;

drop table if exists CUST_ORDER;

drop table if exists CUST_ORDER_HARD_DISK_KIND;

drop table if exists HARD_DISK_KIND;

drop table if exists MEMORY;

drop table if exists SYSTEM;

drop table if exists SYSTEM_KIND;

drop table if exists USER;

/*==============================================================*/
/* Table: CPU                                                   */
/*==============================================================*/
create table CPU
(
   CPU_ID               numeric(16,0) not null,
   CPU_NUM              numeric(16,0),
   primary key (CPU_ID)
);

/*==============================================================*/
/* Table: CPU_MEMORY                                            */
/*==============================================================*/
create table CPU_MEMORY
(
   CPU_ID               numeric(16,0) not null,
   MEMORY_ID            numeric(16,0) not null,
   primary key (CPU_ID, MEMORY_ID)
);

/*==============================================================*/
/* Table: CUSTOMER                                              */
/*==============================================================*/
create table CUSTOMER
(
   CUST_ID              numeric(16,0) not null,
   CUST_NAME            varchar(50),
   CUST_TELEPHONE       varchar(30),
   primary key (CUST_ID)
);

/*==============================================================*/
/* Table: CUST_ORDER                                            */
/*==============================================================*/
create table CUST_ORDER
(
   CUST_ORDER_ID        numeric(16,0) not null,
   SYSTEM_ID            numeric(16,0),
   CUST_ID              numeric(16,0),
   CPU_ID               numeric(16,0),
   MEMORY_ID            numeric(16,0),
   STATUS_CD            varchar(10),
   CUST_ORDER_CREATE_DATE datetime,
   CUST_ORDER_SUM       numeric(16,0),
   primary key (CUST_ORDER_ID)
);

/*==============================================================*/
/* Table: CUST_ORDER_HARD_DISK_KIND                             */
/*==============================================================*/
create table CUST_ORDER_HARD_DISK_KIND
(
   CUST_ORDER_ID        numeric(16,0) not null,
   HARD_DISK_KIND_ID    numeric(16,0) not null,
   HARD_DISK_SIZE       numeric(16,0),
   primary key (CUST_ORDER_ID, HARD_DISK_KIND_ID)
);

/*==============================================================*/
/* Table: HARD_DISK_KIND                                        */
/*==============================================================*/
create table HARD_DISK_KIND
(
   HARD_DISK_KIND_ID    numeric(16,0) not null,
   HARD_DISK_KINE_NAME  varchar(20),
   primary key (HARD_DISK_KIND_ID)
);

/*==============================================================*/
/* Table: MEMORY                                                */
/*==============================================================*/
create table MEMORY
(
   MEMORY_ID            numeric(16,0) not null,
   MEMORY_SIZE          numeric(16,0),
   primary key (MEMORY_ID)
);

/*==============================================================*/
/* Table: SYSTEM                                                */
/*==============================================================*/
create table SYSTEM
(
   SYSTEM_ID            numeric(16,0) not null,
   SYSTEM_KIND_ID       numeric(16,0),
   SYSTEM_NAME          varchar(20),
   primary key (SYSTEM_ID)
);

/*==============================================================*/
/* Table: SYSTEM_KIND                                           */
/*==============================================================*/
create table SYSTEM_KIND
(
   SYSTEM_KIND_ID       numeric(16,0) not null,
   SYSTEM_KIND_NAME     varchar(20),
   primary key (SYSTEM_KIND_ID)
);

/*==============================================================*/
/* Table: USER                                                  */
/*==============================================================*/
create table USER
(
   USER_ID              numeric(16,0) not null,
   PWD                  numeric(16,0),
   USER_NAME            varchar(20),
   primary key (USER_ID)
);

alter table CPU_MEMORY add constraint FK_CPU_MEMORY foreign key (CPU_ID)
      references CPU (CPU_ID) on delete restrict on update restrict;

alter table CPU_MEMORY add constraint FK_CPU_MEMORY2 foreign key (MEMORY_ID)
      references MEMORY (MEMORY_ID) on delete restrict on update restrict;

alter table CUST_ORDER add constraint FK_CUSTOMER_ORDER foreign key (CUST_ID)
      references CUSTOMER (CUST_ID) on delete restrict on update restrict;

alter table CUST_ORDER add constraint FK_CUST_ORDER_CPU foreign key (CPU_ID)
      references CPU (CPU_ID) on delete restrict on update restrict;

alter table CUST_ORDER add constraint FK_CUST_ORDER_MEMORY foreign key (MEMORY_ID)
      references MEMORY (MEMORY_ID) on delete restrict on update restrict;

alter table CUST_ORDER add constraint FK_CUST_ORDER_SYSTEM foreign key (SYSTEM_ID)
      references SYSTEM (SYSTEM_ID) on delete restrict on update restrict;

alter table CUST_ORDER_HARD_DISK_KIND add constraint FK_CUST_ORDER_HARD_DISK_KIND foreign key (CUST_ORDER_ID)
      references CUST_ORDER (CUST_ORDER_ID) on delete restrict on update restrict;

alter table CUST_ORDER_HARD_DISK_KIND add constraint FK_CUST_ORDER_HARD_DISK_KIND2 foreign key (HARD_DISK_KIND_ID)
      references HARD_DISK_KIND (HARD_DISK_KIND_ID) on delete restrict on update restrict;

alter table SYSTEM add constraint FK_SYSTEM_RELATION foreign key (SYSTEM_KIND_ID)
      references SYSTEM_KIND (SYSTEM_KIND_ID) on delete restrict on update restrict;

