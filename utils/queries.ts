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
    id_user_birth,
    MB.id_fertilization_type,
    MS.name stallion,
    FT.description fertilization_type
    from MOD.Births MB
    inner join MOD.Stallions MS
    on MS.id_stallion=MB.id_stallion
    inner join Cat.Fertilization_types FT
    on FT.id_fertilization_type=MB.id_fertilization_type
` as string

export const queryPig=`
SELECT 
id_pig,
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
PT.description pig_type,
CU.description pig_ubication,
CR.description pig_race,
CS.description pig_stage,
WS.description pig_weight,
MS.name stallion
FROM MOD.Pigs MP
inner join CAT.Pig_types PT
on PT.id_pig_type=MP.id_pig_type
inner join CAT.Ubications CU
on CU.id_ubication=MP.id_ubication
inner join CAT.Races CR
on CR.id_race=MP.id_race
inner join CAT.Pig_stages CS
on CS.id_pig_stage=MP.id_pig_stage
inner join MOD.Stallions MS
on MS.id_stallion=MP.id_stallion
inner join CAT.Weight_types WS
on WS.id_weight_type=MP.id_weight_type
` as string