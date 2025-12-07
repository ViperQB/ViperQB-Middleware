from setuptools import setup

try:
    import pypandoc
    long_description = pypandoc.convert('README.md', 'rst')
except(IOError, ImportError):
    long_description = open('README.md').read()

setup(
    name='ViperQB',
    version='1.1',
    description='ViperQb fork: Secret Vault — hide and (optionally) AES-encrypt files.',
    long_description=long_description,
    long_description_content_type='text/markdown',
    author='Maneesh Pradeep',
    author_email='maneesh.pradeep@protonmail.com',
    maintainer='PODyokira (ViperQb)',
    maintainer_email='',
    url='https://github.com/PODyokira',
    license='MIT',
    py_modules=['secret_vault'],
    install_requires=['cryptography', 'pyAesCrypt'],
    entry_points={
        'console_scripts': [
            'secret_vault = secret_vault:main',
        ],
    },
    classifiers=[
        'Topic :: Security',
        'Topic :: Security :: Cryptography',
        'License :: OSI Approved :: MIT License',
        'Operating System :: OS Independent',
        'Natural Language :: English',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python',
        'Development Status :: 4 - Beta',
    ],
)
