from sportsipy.ncaab.schedule import Schedule
from sportsipy.ncaab.teams import Teams
from sportsipy.ncaab.boxscore import Boxscore
from sportsipy.ncaab.roster import Player
import requests
import re
from bs4 import BeautifulSoup

URL = "https://www.sports-reference.com"
TOURNAMENT_URL =  URL + "/cbb/postseason/2022-ncaa.html"

tournament = requests.get(TOURNAMENT_URL)

ADD_TEAM = 'http://localhost:1234/team/create'
UPDATE_POINTS = 'http://localhost:1234/player/points/'

tournament_page = BeautifulSoup(tournament.content, "html.parser")

brackets = tournament_page.find_all("a", href=re.compile(r"/cbb/schools/.*/2022.html"))

bracket = {team['href'].replace('/2022.html', '/2022-schedule.html') for team in brackets}
teams = Teams()
for team in bracket:
	# Open up the page for the current team
	team_page = BeautifulSoup(requests.get(URL + team).content, "html.parser")

	# Find the games that they played in the NCAA tournament
	tournament_games = team_page.find_all("td", attrs={"data-stat": "game_type"})
	games = []
	for t_game in tournament_games:
		if t_game.get_text() == "NCAA":
			t_game_date = t_game.find_previous_sibling("td", attrs={"data-stat": "date_game"}).find("a")
			if t_game_date is not None:
				t_game_link = t_game_date['href']
				games.append(t_game_link)

	#Get the team data so that we can get the roster of players
	team_stripped = team.replace('/cbb/schools/', '').replace('/2022-schedule.html', '')
	team_data = teams(team_stripped)

	print(team_stripped)
	print(games)


	for player in team_data.roster.players:
		print(player.player_id)
		player_points = 0
		for g in games:
			game_page = BeautifulSoup(requests.get(URL + g).content, "html.parser")
			player_data = game_page.find("th", attrs={"data-append-csv": player.player_id});
			if player_data is not None:
				player_points = player_points + int(player_data.find_next_sibling("td", attrs={"data-stat": "pts"}).get_text())
		print(player_points)
		if player_points > 0:
			requests.put(UPDATE_POINTS + player.player_id, data={'playerPoints': player_points })