### problem log

| column | type | constraint |
| ---- | ---- | ---- |
| user_id | uuid | pk |
| created_at  | timestamptz| pk |
| category_id | int4 | fk not null|
| problem_id | int4 | not null |
| correct | int4 | not null |
| miss | int4 | not null |
| speed | float8 | not null |

### miss per log
miss_per_typeはキー1つに対するミスタイプの回数を少数第二位まで保持

それを100倍して整数で保存する

| column | type | constraint |
| ---- | ---- | ---- |
| user_id | uuid | pk |
| created_at  | timestamptz| pk |
| miss_per_type | int4[] | not null |

### miss prev log
| column | type | constraint |
| ---- | ---- | ---- |
| user_id | uuid | pk |
| created_at | timestamptz| pk |
| miss_prev_type | int4[] | not null |