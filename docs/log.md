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
タイプミスが発生したとき，実際のキーが何であったか

- miss_per_typeはキー1つに対するミスタイプの回数を少数第二位まで保持
- それを100倍して整数で保存する

    const value = Math.ceil((100 * missTypes[i]) / correctTypes[i])

| column | type | constraint |
| ---- | ---- | ---- |
| user_id | uuid | pk |
| created_at  | timestamptz| pk |
| miss_per_type | int4[] | not null |

### miss prev log
タイプミスが発生したとき，実際のキーとその一つ前のキーが何であったか

- 現在が$i$番目のキーだったとして，一つ前が$j$番目のキーだったとする
- このとき，miss_prev_type[]のKEY_IDX.size $* \,i + j$ にミス回数を加算していく
- miss_per_typeと同じように最終的にすべてキーについてcorrect typeでミス回数を割っていく

        for (let k  = 0; k < KEY_IDX.size; k++) {
            const value = Math.ceil((100 * missPrevTypes[i * KEY_IDX.size + k]) / correctTypes[i])
        }

| column | type | constraint |
| ---- | ---- | ---- |
| user_id | uuid | pk |
| created_at | timestamptz| pk |
| miss_prev_type | int4[] | not null |