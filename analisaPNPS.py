#-*- coding: utf8 -*-
import networkx as x, nltk as k, time as T, pymongo, sys, string

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
foo__=string.join([i["text"] for i in foo_]).lower()
foo__B=string.join([i["text"] for i in foo_]).replace(":","").replace(",","").replace(".","").replace("?","").lower()
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
# apresenta palavras
notes.write("\ntokens mais importantes para definir o dominio: "+    str(contPP_L)[1:-1])
notes.write("\n\ntokens e suas contagens: "+    str(contPP_)[1:-1])

############################################
############################################
# faz rede de relacionamento por palavra

text=string.join([i["text"] for i in foo_]," ")
sw=stopwords

text_=text
exclude = set(string.punctuation.replace("#","").replace("@",""))
text__= ''.join(ch for ch in text_ if ch not in exclude)
# tokenização na unha
text=text__.encode('utf-8').lower().split()
#tx=k.Text(text)
# separar os users:
users=[i for i in text if i.startswith("@") and "\xe2\x80\xa6" not in i]
text2_=[i for i in text if not i.startswith("@")]
nusers=len(users)
#nusers_rotos=(len(text)-len(text2_))-nusers

# separar tags:
tags=[i for i in text2_ if i.startswith("#") and "\xe2\x80\xa6" not in i]
text2=[i for i in text2_ if not i.startswith("#")]
ntags=len(tags)
#ntags_rotas=(len(text)-len(text2))-ntags
# separar stopwords
sw=set(sw+[u"é","be","é","q"])
text3=[tt for tt in text2 if (tt not in sw) and (not tt.isdigit()) and (not tt.startswith("http"))]
#sws=[tt for tt in text2 if tt in sw]
#nsws=len(sws)
# radicalizar
#radicalizador=k.stem.RSLPStemmer()
#text4=[radicalizador.stem(i.decode("utf-8")).encode("utf-8") for i in text3]
#text=text4
text=text3
kk=k.Text(text) # aqui o text novo



# end not simples
bigram_measures = k.collocations.BigramAssocMeasures()
finder=k.collocations.BigramCollocationFinder.from_words(text)
finder.apply_freq_filter(3)
col10=finder.nbest(bigram_measures.pmi,50)

freq=kk.vocab()
npal=freq.B()
hist=freq.items()
hist_=[]
for hh in hist[int(npal*0.05):int(npal*0.2)]:
    d={"name":hh[0],"count":hh[1]}
    hist_+=[d]
####
palavras=freq.samples()[int(npal*0.05):int(npal*0.2)]
gpal=x.Graph()
for palavra in palavras:
    gpal.add_node(palavra.decode("utf-8"),{"group":1})
    print palavra
users__=set([mm["user"]["screen_name"] for mm in foo_])
for user in users__:
    if not user:
        onome="foobar"
    # faz o amálgama de todos os textos dele
    mmsgs=string.join([mmm["text"].encode('utf-8') for mmm in foo_ if mmm["user"]["screen_name"]==user])
    for palavra in palavras:
        peso=mmsgs.count(palavra)
        if peso > 0:
            if user not in [foobar for foobar in gpal.nodes()]:
                gpal.add_node(user.decode("utf-8"),{"group":2})
            gpal.add_edge(user,palavra.decode("utf-8"),{"value":peso})
x.write_graphml(gpal,"relacionamentoPalavras.graphml")
gpal_=x.connected_component_subgraphs(gpal)[0]
nodes=gpal_.nodes(data=True)
graus=gpal_.degree(weight="weight")
cu={}
i=0
nodes_=[]
for node in nodes:
    nodes_.append({"nome":node[0],"group":node[1]["group"],"peso_total":graus[node[0]]})
    cu[node[0]]=i
    i+=1
links=gpal_.edges(data=True)
links_=[]
for link in links:
    links_.append({"source":cu[link[0]],"target":cu[link[1]],"value":link[2]["value"]})
graph={"nodes":nodes_,"links":links_,"npalavras":len(palavras)}
 



# faz rede de relacionamento por hashtags
# fazer rede de retweet:
notes.close()


