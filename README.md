実行環境も含めて、一括でローカルにtestrpcとtruffle用のAPIサーバを立ち上げます

### 起動
~~~
$ docker-compose up
~~~

### マイグレーションは以下にcurlすればOK

~~~
$ curl localhost:5000/migrate
~~~
