from sportsipy.ncaab.schedule import Schedule
from sportsipy.ncaab.teams import Teams
from sportsipy.ncaab.boxscore import Boxscore
from sportsipy.ncaab.roster import Player
import requests
import re
from bs4 import BeautifulSoup

URL =  "https://www.sports-reference.com/cbb/postseason/2022-ncaa.html"
page = requests.get(URL)

ADD_TEAM = 'http://localhost:1234/team/create'
ADD_PLAYER_TO_TEAM = 'http://localhost:1234/team/addplayer/'

soup = BeautifulSoup(page.content, "html.parser")

brackets = soup.find_all("a", href=re.compile(r"/cbb/schools/.*/2022.html"))

bracket = {team['href'].replace('/cbb/schools/', '').replace('/2022.html', '') for team in brackets}

teams = Teams()
for team in bracket:

	team_data = teams(team)
	print(team_data)
	response = requests.post(ADD_TEAM, data={'teamName': team_data.name})
	team_id = response.json()

	for player in team_data.roster.players:
		localhost:1234/team/addplayer send player NAME ONLY 
		print(player.id)
		requests.post(ADD_PLAYER_TO_TEAM + team_id, data={'playerName': player.name, 'playerId': player._player_id})


