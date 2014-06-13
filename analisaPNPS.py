#-*- coding: utf8 -*-
import pymongo, time as T, sys, string

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
foo___=foo__.split()
notes.write("\nhashtags: "+str(set([hash for hash in foo___ if hash[0]=="#"])).replace("u","").replace("'","")[5:-3]  )

# ==
# medidas avançadas
notes.write("\n\n===Medidas Avancadas===")
notes.write("\nnumero de caracteres: "+str(len(foo__)))
notes.write("\nnumero de tokens: "+    str(len(foo___)))
notes.write("\nnumero de hashtags: "+  str(len([hash for hash in foo___ if hash[0]=="#"])))
notes.write("\nnumero de enderecamentos: "+str(len([hash for hash in foo___ if hash[0]=="@"])))
notes.close()




