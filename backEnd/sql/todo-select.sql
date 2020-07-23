
/* 해당 유저 아이디가 가지고 있는 투두 리스트 가져오기*/
select todoList.id as 'id', todoList.user_Id as 'user_id', mydb.column.id as 'column_id', mydb.column.title as 'column_title'
from todoList
	left join mydb.column
		on todoList.id = mydb.column.todoList_id
        where todoList.user_id = 26;
        

/* 카드 셀렉트. 해당 카드를 쓴 사람 정보, 해당카드가 속한 컬럼 정보*/        
select card.id as id, card.contents as contents, card.created_at as created_at, card.order 'order', card.column_id as column_id, mydb.column.title as column_todo, card.user_id as user_id, user.userId as userId, user.password as user_password
from card 
	left join user 
		on user.id = card.user_id
	left join mydb.column 
		on card.column_id = mydb.column.id
			where card.column_id = 2;

SELECT *
FROM 
    (select todoList.id as 'id', todoList.user_Id as 'user_id', mydb.column.id as 'column_id', mydb.column.title as 'column_title'
		from todoList
			left join mydb.column
				on todoList.id = mydb.column.todoList_id
				where todoList.user_id = 26) todo
LEFT JOIN
    (select card.id as id, card.contents as contents, card.created_at as created_at, card.order 'order', card.column_id as column_id, mydb.column.title as column_todo, card.user_id as user_id, user.userId as userId, user.password as user_password
		from card 
			left join user 
				on user.id = card.user_id
			left join mydb.column 
				on card.column_id = mydb.column.id) card
ON (todo.column_id = card.column_id);

        
select * from mydb.card;