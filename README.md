実行環境も含めて、一括でローカルにtestrpcとtruffle用のAPIサーバを立ち上げます

## 起動
~~~
$ docker-compose up
~~~

もし、バックグラウンド実行したい場合は
~~~
$ docker-compose up -d
~~~

## networkの指定

デフォルトではdockerで立ち上がったtestrpcに繋がるようになっています
~~~
$ truffle migrate --network development
~~~
↑引数指定しない場合、デフォルトでdevelopmentに繋がります

## ropsten network利用時

1. metamaskでropstenのアカウントを取得し、etherを取得(詳細はネットで探してください)
2. metamaskのmemonicを環境変数MNEMONICに格納
~~~
$ source MNEMONIC="XXXXXXXXXXXXXXXX"
~~~
<span style="color: red; ">環境変数は絶対にソースコードに直書きしないこと</span>

3. https://infura.io に登録する
4. infra.ioにアクセスした後の後ろのキーを環境変数INFURA_ACCESS_TOKENに格納

最後に下記コマンドでmigrateできます
~~~
$ truffle migrate --network ropsten
~~~

## testの実行
~~~
$ truffle test --network development
~~~

## flaskを使う場合
基本的にこの方法は利用する必要ないです

### マイグレーションは以下にcurlすればOK

~~~
$ curl localhost:5000/migrate
~~~
