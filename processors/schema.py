import click
import csv
import os

from jinja2 import Template
from slugify import slugify

SQL_TEMPLATE = """
create table raw.{{tablename|lower}} (
    {% for field in fields %}{{field}} character varying{{ ',' if not loop.last }}
    {% endfor %}
);
"""


@click.command()
@click.argument('input', type=click.File('r'))
@click.argument('output', type=click.File('w'))
def generate(input, output):
    """Generate a schema"""

    tablename, ext = os.path.splitext(os.path.basename(input.name))

    reader = csv.DictReader(input)
    fields = [slugify(row['field'], separator="_") for row in reader]

    t = Template(SQL_TEMPLATE)
    sql = t.render(tablename=tablename, fields=fields)
    output.write(sql)

if __name__ == '__main__':
    generate()
