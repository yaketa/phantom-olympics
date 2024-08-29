"use client"

import { useState, useEffect } from "react"
import { kv } from '@vercel/kv'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { MessageCircle, Copy, Check, BadgeCheck } from "lucide-react"

const hiragana = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん"

function getRandomItem(array: string[]): string {
  return array[Math.floor(Math.random() * array.length)]
}

function getRandomHiragana(): string {
  return getRandomItem(hiragana) + getRandomItem(hiragana)
}

function getRandomEmoji(array: string[], count: number): string {
  return Array(count).fill(null).map(() => getRandomItem(array)).join('')
}

export default function PhantomOlympics() {
  const [result, setResult] = useState("")
  const [copied, setCopied] = useState(false)
  const [username, setUsername] = useState("？？子")
  const [dbData, setDbData] = useState<{[key: string]: string[]}>({})

  useEffect(() => {
    async function fetchData() {
      const keys = ['ikiterudaketde', 'erainode', 'yusho', 'face', 'gestures', 'sparkles']
      const data: {[key: string]: string[]} = {}
      for (const key of keys) {
        data[key] = await kv.get(key) || []
      }
      setDbData(data)
    }
    fetchData()
  }, [])

  const generateOlympics = async () => {
    const yasu = getRandomHiragana()
    const dakede = getRandomItem(dbData.ikiterudaketde || [])
    const erainode = getRandomItem(dbData.erainode || [])
    const yusho = getRandomItem(dbData.yusho || [])
    const face = getRandomEmoji(dbData.face || [], 4)
    const gestures = getRandomEmoji(dbData.gestures || [], 4)
    const sparkles = getRandomEmoji(dbData.sparkles || [], 3)

    const generatedText = `${yasu}子オリンピック\n\n${dakede}${erainode}皆\n${yusho}でーす${face}${gestures}${sparkles}`
    setResult(generatedText)
    setUsername(yasu + "子")
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="px-[10%] sm:px-0 w-full">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&family=Shippori+Antique&display=swap');
        body {
          font-family: 'Noto Sans JP', sans-serif;
        }
        .title {
          font-family: 'Shippori Antique', sans-serif;
        }
        .small-no {
          font-size: 0.75em;
          vertical-align: middle;
        }
      `}</style>
      <Card className="w-full max-w-3xl mx-auto shadow-lg">
        <CardHeader className="pb-4 pt-10">
          <CardTitle className="text-2xl sm:text-4xl font-bold text-center text-primary title">
            まぼろし<span className="small-no">の</span>オリンピック
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative bg-secondary/10 rounded-md border-2 border-primary/20 focus-within:border-primary/50 transition-all duration-300 w-full sm:w-3/5 mx-auto">
            <div className="absolute top-3 left-3 flex items-center space-x-1 text-sm font-semibold text-primary/70">
              <span>{username}</span>
              <BadgeCheck className="w-4 h-4 text-blue-500" />
            </div>
            <Textarea
              value={result}
              readOnly
              className="h-40 sm:h-64 resize-none text-sm pt-10 px-4 pb-4 rounded-md bg-transparent border-none focus:ring-0"
              placeholder="ここに結果が表示されます"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute bottom-1 right-1 text-primary/70 hover:text-primary transition-colors duration-200"
              onClick={copyToClipboard}
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          <div className="pt-8 px-5 w-full sm:w-3/5 mx-auto">
            <Button 
              onClick={generateOlympics} 
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white font-bold py-4 sm:py-6 px-6 rounded-full shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-102 text-base sm:text-lg"
            >
              開催
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-5 w-full sm:w-3/5 mx-auto">
            <Button 
              variant="outline" 
              className="w-full py-4 sm:py-6 px-4 bg-gradient-to-r from-gray-800 to-black hover:from-gray-900 hover:to-gray-800 text-white font-bold rounded-full shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-102"
              onClick={() => window.open("https://twitter.com/intent/tweet?text=" + encodeURIComponent(result), "_blank")}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Xで共有
            </Button>
            <Button 
              variant="outline" 
              className="w-full py-4 sm:py-6 px-4 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-bold rounded-full shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-102"
              onClick={() => window.open("https://line.me/R/msg/text/?" + encodeURIComponent(result), "_blank")}
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              LINEで共有
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}