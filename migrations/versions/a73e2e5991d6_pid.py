"""pId

Revision ID: a73e2e5991d6
Revises: 5e24558c9b0c
Create Date: 2016-08-30 21:43:12.044763

"""

# revision identifiers, used by Alembic.
revision = 'a73e2e5991d6'
down_revision = '5e24558c9b0c'

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.add_column('departments', sa.Column('pId', sa.Integer(), nullable=True))
    op.drop_column('departments', 'parent_id')
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.add_column('departments', sa.Column('parent_id', sa.INTEGER(), nullable=True))
    op.drop_column('departments', 'pId')
    ### end Alembic commands ###
