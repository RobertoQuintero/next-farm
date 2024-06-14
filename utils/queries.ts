export const queryBirth=`
        select 
        id_birth,
        id_pig,
        MB.id_stallion,
        birth_date,
        confirm_date,
        crossing_date,
        is_positive,
        alive,
        dead,
        MB.description,
        MB.status,
        MB.created_at,
        id_user,
        id_user_confirm,
        comment,
        id_user_birth,
        MB.id_fertilization_type,
        MS.name stallion,
        MB.id_birth_type,
        BT.description birth_type,
        closed,
        FT.description fertilization_type
        from MOD.Births MB
        left join MOD.Stallions MS
        on MS.id_stallion=MB.id_stallion
        left join Cat.Fertilization_types FT
        on FT.id_fertilization_type=MB.id_fertilization_type
        left join CAT.Birth_types BT
        on BT.id_birth_type=MB.id_birth_type
` as string

export const queryPig=`
SELECT 
MP.id_pig,
MP.id_weight_type,
MP.id_pig_type,
MP.id_ubication,
MP.id_race,
code,
MP.added_date,
MP.created_at,
MP.id_stallion,
visible,
MP.id_farm,
MP.id_pig_stage,
MP.status, 
bar_code, 
PT.description pig_type,
CU.description pig_ubication,
CR.description pig_race,
CS.description pig_stage,
WS.description pig_weight,
MS.name stallion,
flag,
MOD.getIsActive(MP.id_pig,MP.id_pig_stage) is_active,
--(select top 1 birth_date from MOD.Births MB where is_positive='true' and MB.id_pig=MP.id_pig order by birth_date desc) birth_date,
isnull((select SUM(alive) from MOD.Births MB where MB.id_pig=MP.id_pig),0) piglets,
convert(datetime,MOD.getBirthDay(MP.id_pig,MP.id_pig_stage)) next_birth,
(select count(*) from MOD.Births where alive>0 and id_pig=MP.id_pig) births,
MOD.getGatePiglets(MP.id_pig,MP.id_pig_stage) gate_piglets,
datediff(day,getdate(),convert(datetime,MOD.getBirthDay(MP.id_pig,MP.id_pig_stage))) counting_days,
MOD.setMonthName(DATEPART(MONTH,(select top 1 birth_date from MOD.Births MB where is_positive='true' and MB.id_pig=MP.id_pig order by birth_date desc)),MP.id_pig_stage) month_name,
(select top 1 crossing_date from MOD.Births MB where is_positive='true' and MB.id_pig=MP.id_pig order by birth_date desc) crossing_date,
(select top 1 ms.name from MOD.Births MB left join MOD.Stallions MS on MS.id_stallion=MB.id_stallion where is_positive='true' and MB.id_pig=MP.id_pig order by birth_date desc) crossing_stallion,
(select count(*) from MOD.Births where id_birth_type=2 and id_pig=MP.id_pig and status='true') false_charge,
(select count(*) from MOD.Births where id_birth_type=3 and id_pig=MP.id_pig and status='true') abortions
FROM MOD.Pigs MP
left join CAT.Pig_types PT
on PT.id_pig_type=MP.id_pig_type
left join CAT.Ubications CU
on CU.id_ubication=MP.id_ubication
left join CAT.Races CR
on CR.id_race=MP.id_race
left join CAT.Pig_stages CS
on CS.id_pig_stage=MP.id_pig_stage
left join MOD.Stallions MS
on MS.id_stallion=MP.id_stallion
left join CAT.Weight_types WS
on WS.id_weight_type=MP.id_weight_type
` as string