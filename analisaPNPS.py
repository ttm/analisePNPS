#-*- coding: utf8 -*-
import nltk as k, time as T, pymongo, sys, string

HTAG="#pnps"
HTAG_=HTAG.replace("#","NEW")
from maccess import mdc
client=pymongo.MongoClient(mdc.u1)
db = client['sna']
C = db[HTAG_] #collection

foo=C.find({},{"_id":0}).sort("id",pymongo.ASCENDING)
foo_=[ff for ff in foo]

notes=open("anotacoes.txt","wb")
notes.write("primeira mensagem: "+foo_[0]["created_at"])
notes.write("\nultima mensagem: "+foo_[-1]["created_at"])
notes.write("\nnumero de mensagens: "+str(len(foo_)))
notes.write("\nnumero de autores: "+str(len(set([ff["user"]["id"] for ff in foo_]))))
foo__=string.join([i["text"] for i in foo_])
foo__B=string.join([i["text"] for i in foo_]).replace(":","").replace(",","").replace(".","").replace("?","")
foo___=foo__.split()
foo___B=foo__B.split()
#notes.write("\nhashtags: "+str(set([hash for hash in foo___ if hash[0]=="#"])).replace("u","").replace("'","")[5:-3]  )
htags=set([hash for hash in foo___B if hash[0]=="#"])
htags_=sorted([(i,foo__B.count(i)) for i in htags],key=lambda x: x[1])
#notes.write(("\nhashtags: " + ("%s %s, "*len(htags_))) %([htags_[::-1]],) )
notes.write("\nhashtags: "+str(htags_[::-1]).replace("u","").replace("'","")[1:-1]  )
#notes.write("\nhashtags: "+str([(i,foo___B.count(i)) for i in htags ]).replace("u","").replace("'","")[1:-1]  )
#notes.write("\nhashtags: "+str([(i,foo___B.count(i)) for i in set([hash for hash in foo___B if hash[0]=="#"])]).replace("u","").replace("'","")[1:-1]  )

# ==
# medidas avançadas
notes.write("\n\n===Medidas Avancadas===")
notes.write("\nnumero de caracteres: "+str(len(foo__)))
notes.write("\nnumero de tokens: "+    str(len(foo___)))
notes.write("\nnumero de hashtags: "+  str(len([hash for hash in foo___ if hash[0]=="#"])))
notes.write("\nnumero de hashtags diferentes: "+  str(len(set([hash for hash in foo___B if hash[0]=="#"]))))
notes.write("\nnumero de enderecamentos: "+str(len([hash for hash in foo___ if hash[0]=="@"])))

stopwords = k.corpus.stopwords.words('portuguese')
# conta palavras
# se comeca com hashtag, corta:
fooP=[i for i in foo___ if i[0] not in ["#","@"]]
fooPP=[i for i in fooP if i not in ([ii.decode("utf-8") for ii in stopwords])]

fooPP_=set(fooPP)
contPP=[(i,fooPP.count(i)) for i in fooPP_]
contPP_=sorted(contPP,key=lambda x: x[1])

# com corte de luhn:
def fact(frac): return int(frac*len(contPP_))
contPP_L=(contPP_[::-1])[fact(0.05):fact(0.2)]
notes.write("\ntokens mais importantes para definir o dominio: "+    str(contPP_L)[1:-1])
notes.write("\n\ntokens e suas contagens: "+    str(contPP_)[1:-1])

# faz corte de luhn
# apresenta palavras
# faz rede de relacionamento por palavra
# faz rede de relacionamento por hashtags
# fazer rede de retweet:
notes.close()


