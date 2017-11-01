#!/usr/bin/env python
# Name: Timothy Macmillan
# Student number: 12022160
'''
This script scrapes IMDB and outputs a CSV file with highest rated tv series.
'''
import csv

from pattern.web import URL, DOM, plaintext

TARGET_URL = "http://www.imdb.com/search/title?num_votes=5000,&sort=user_rating,desc&start=1&title_type=tv_series"
BACKUP_HTML = 'tvseries.html'
OUTPUT_CSV = 'tvseries.csv'

# this is the list that will eventually be added with the csv writer 
tvlist = []

def extract_tvseries(dom):
    '''
    Extract a list of highest rated TV series from DOM (of IMDB page).

    Each TV series entry should contain the following fields:
    - TV Title
    - Rating
    - Genres (comma separated if more than one)
    - Actors/actresses (comma separated if more than one)
    - Runtime (only a number!)
    '''

    for tv in dom.by_class('lister-item-content'):
        # find the title and remove non unicode characters
        title = tv.by_tag('a')[0].content
        title = "".join([ch for ch in title if ord(ch)<= 128])

        # find the rating value and make it a float in order to print correctly
        rating = float(tv.by_tag('span.value')[0].content)

        # find the genre and remove the excess spaces and enters
        genre = tv.by_class('genre')[0].content
        genre = genre.strip(" ")
        genre = genre.strip("\n")

        # create an empty string for actors
        actors = ""
        # find the actors and add each with a comma and space in between
        for actor in tv.by_tag('p')[2].by_tag('a'):
            actors += actor.content + ", "
        # remove the two trailing characters and remove the non unicode characters
        actors = actors[:-2]
        actors = "".join([ch for ch in actors if ord(ch)<= 128])

        # find the runtime and remove the non digit characters
        try:
            runtime = tv.by_tag('span.runtime')[0].content
            runtime = "".join(x for x in runtime if x.isdigit())
        # if can't be found, make this field blank
        except:
            runtime = ""

        # create a temperary list for a single tv show
        templist = []
        templist.extend([title, rating, genre, actors, runtime])
        # add the list of the tv show to the main list
        tvlist.append(templist)

    return tvlist


def save_csv(f, tvseries):
    '''
    Output a CSV file containing highest rated TV-series.
    '''

    writer = csv.writer(f)
    writer.writerow(['sep=,'])
    writer.writerow(['Title', 'Rating', 'Genre', 'Actors', 'Runtime'])

    # write the tvlist list to the csv file
    writer.writerows(tvlist)


if __name__ == '__main__':
    # Download the HTML file
    url = URL(TARGET_URL)
    html = url.download()

    # Save a copy to disk in the current directory, this serves as an backup
    # of the original HTML, will be used in grading.
    with open(BACKUP_HTML, 'wb') as f:
        f.write(html)

    # Parse the HTML file into a DOM representation
    dom = DOM(html)

    # Extract the tv series (using the function you implemented)
    tvseries = extract_tvseries(dom)

    # Write the CSV file to disk (including a header)
    with open(OUTPUT_CSV, 'wb') as output_file:
        save_csv(output_file, tvseries)