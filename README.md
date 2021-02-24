The fork of [Meisskey](https://github.com/mei23/misskey)

## 改造したところ

上述の通りめいすきーがベースである。そのうえでの改造。

### ~~1.InstanceTicker(Type-41)標準対応~~←同様の機能が標準搭載された影響で、[InstanceTicker側がサポートを終了](https://mk.lei202.com/notes/71758206ef70147724f6b8cb)したため廃止。[info](https://mk.lei202.com/notes/7175737e16f886fb7e75a111)

https://github.com/Leies-202/misskey/commit/4b951a667b105706da5914fd37c6e8fdb55f710a

### 2.標準テーマの変更。

https://github.com/Leies-202/misskey/blob/mei-m544/src/client/themes/promo.json5

### 3.アニメーション停止はデフォルト無効(めいすきーではデフォルト有効)

https://github.com/Leies-202/misskey/commit/ff06c10068faddf1ae6590b2cd10892ef3787831

### ~~4.シェアページのhashtags変数対応~~←失敗したのでとりあえずissue化

https://github.com/Leies-202/misskey/issues/2

### 5.通知音とかをV12のやつに

https://github.com/Leies-202/misskey/commit/f98f767e867a0df8c086b947f18477976a8c3654

バージョン名--lei（数字） の形の時はぶっつけ本番でテスト中(テスト環境をろくすっぽ用意していない怠惰)の証。

以上
